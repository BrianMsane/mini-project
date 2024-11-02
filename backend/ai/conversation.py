

from utils.schemas import User
from .agents import Assistant, Delegator


class Conversation:
    ''' Chat with the user
    '''
    def __init__(
        self,
        user: User,
        delegator: Assistant,
        agents: list[Assistant],
        manager: Assistant
    ):
        self.user = user
        self.delegator = delegator
        self.agents = agents
        self.manager = manager


    def choose(self, query: str):
        agent = Delegator().delegate(query)
        response = agent.respond()
        return response
