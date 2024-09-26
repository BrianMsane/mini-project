'''Chatbot which will be used to gather information from the applicant
'''

import yaml
import autogen


with open("model_config.yaml", "r") as file:
    model_config = yaml.safe_load(file)


class FormCollector:
    def __init__(
        self,
        system_message: str=model_config['form_data_collector']['system_prompt'],
        model: str=model_config['form_data_collector']['model']
    ) -> None:
        '''Define the attributes of this class
        '''
        self.system_message=system_message
        self.model = model
        self.user = autogen.UserProxyAgent(
            name='applicant',
            description=model_config['form_data_collector']['user_description']
        )
        self.assistant = autogen.AssistantAgent(
            name='application_data_collector',
            description=model_config['form_data_collector']['assistant_description'],
            system_message=self.system_message,
        )


    def collect(self):
        '''Collect the data
        '''
        self.user.initiate_chat(
            recipient=self.assistant,
            cache=42,
            max_turns=50
        )
