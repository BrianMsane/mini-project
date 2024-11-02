''' Define AI agents
'''

# pylint: disable=broad-except

from typing import Callable
from yaml import safe_load
from autogen import ConversableAgent, UserProxyAgent
from utils.emails import EmailSupport
from utils.ops import Recommendation
from utils.schemas import User


with open('model_config', 'r') as file:
    model_config = safe_load(file)


class Assistant(ConversableAgent):
    '''Wrapper class for agents
    '''

    def __init__(
        self,
        system_message: str,
        model: str
    ) -> None:
        self.system_message = system_message
        self.model = model


    async def respond(self, query: str):
        ''' respond to the user query
        '''
        user_proxy = UserProxyAgent()
        response = await user_proxy.a_initiate_chat(
            self, message=query, clear_history=False, silent=True
        )
        return response


    def add_custom_tool(
        self: ConversableAgent,
        tool: Callable,
        tool_name: str,
        tool_description: str
    ) -> None:
        """Allows the agent to use a user-defined function.
        It will decide when to use it depending on the description.
        
        Args:
            tool: the tool to be added. Must be a function that is NOT a class method.
            tool_name: what the LLM will see as the function name
            tool_description: tell the LLM what to do with the tool and when to use it
        """
        d_tool = self.register_for_llm(
            name=tool_name,
            description=tool_description,
        )(tool)
        self.tools[tool_name] = d_tool


class EmailAssistant(Assistant):
    ''' Handle contact us page automatically
    '''

    def __init__(
        self,
        system_messge: str,
        model: str
    ) -> None:
        super.__init__(system_messge=system_messge, model=model)

        async def send_email(response: str):
            email = EmailSupport(sender_email='msanebrianboss@gmail.com', message=response, name='Kuhle')
            return await email.send_email()

        self.add_custom_tool(
            tool=send_email,
            tool_description='Sends support email to our users who contacted with a query',
            tool_name='email_sender'
        )


class Recommender(Assistant):
    ''' Program recommendation assistant
    '''

    def __init__(
        self,
        user: User,
        system_messge: str=model_config['recommender']['system_message'],
        model: str=model_config['recommender']['system_message'],
    ) -> None:
        self.user = user
        super.__init__(system_messge=system_messge, model=model)

        async def recommend_programs():
            rec = Recommendation(user=self.user)
            return await rec.recommend()

        self.add_custom_tool(
            tool=recommend_programs,
            tool_description=Recommendation.__doc__,
            tool_name='recommender'
        )


class Delegator(Assistant):
    
    def __init__(
        self,
        model: str=model_config['delegator']['model'],
        system_message: str=model_config['delegator']['system_message']
    ):
        self.model = model
        self.system_message = system_message


    def delegate(self, user_proxy: UserProxyAgent, query: str) -> int:
        """Returns the index of the agent a query should be delegated to.
        """
        try:
            chat_result = user_proxy.initiate_chat(
                self, message=query, clear_history=False, silent=False, max_turns=1
            )
            response = chat_result.chat_history[-1]["content"]
            index = int(response)
            return index
        except Exception as e:
            return 0
