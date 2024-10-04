

from abc import ABC


class Agent(ABC):
    '''Wrapper class for agents
    '''
    
    def __init__(
        self,
        system_message: str,
        model: str
    ) -> None:
        self.system_message = system_message
        self.model = model


    def change_model(self, model: str):
        self.model = model
        

class EmailAssistant(Agent):
    
    def __init__(
        self,
        system_messge: str,
        model: str
    ) -> None:
        super.__init__(system_messge=system_messge, model=model)


class Recommender(Agent):

    def __init__(
        self,
        system_messge: str,
        model: str
    ) -> None:
        super.__init__(system_messge=system_messge, model=model)