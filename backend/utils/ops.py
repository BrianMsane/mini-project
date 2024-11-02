'''Store Utility functions for the backend of the project
'''

from db.mongo import read
from schemas import User


class Recommendation:
    ''' 
    Recommends the programs that the user qualifies for from a whole list
    sorted according to the stream and points
    '''

    def __init__(
        self,
        user: User,
    ):
        self.data: dict = read(query={'user_id':user.username})
        self.user = user


    def grade_to_point(self, grade: str):
        '''Match the grade with the equivalent point value(EGCSE)
        '''
        if grade == 'A*':
            return 8
        if grade == 'A':
            return 7
        if grade == 'B':
            return 6
        if grade == 'C':
            return 5
        if grade == 'D':
            return 4
        if grade == 'E':
            return 3
        if grade == 'F':
            return 0
        if grade == 'G':
            return 0
        if grade == 'U':
            return 0


    def sort_credits(self, data: dict):
        '''Sort the grades to find the best 6 credits
        '''
    


    def cal_points(self) -> int:
        '''Calculate the total number of points the user has
        '''
        points: int = 0
        results = self.data['symbols']['grade']
        for index, grade in enumerate(results):
            if index <= 5:
                point = self.grade_to_point(grade)
                points += int(point)
        return points


    def rel_programs(
        self,
        data: dict,
        points: int,
        streams: list[str]=None
    ) -> list[dict]:
        ''' Get all the courses that the user qualifies for
        '''
        qualifyFor = []
        finalQualifyFor = []
        for program in data['programs']:
            if program['cutOfPoint'] >= points:
                qualifyFor.append(program)
        for course in qualifyFor:
            if course['stream'] in streams:
                finalQualifyFor.append(course)
        return finalQualifyFor


    def recommend(self):
        '''Running the entire application
        '''
        user_points = self.cal_points(self.data)
        qualifyingPrograms = self.rel_programs(points=user_points, data=self.data, streams=None)
        details: list = []
        for program in qualifyingPrograms:
            details.append(
                {
                    'name': program['name'],
                    'institution': program['institution'],
                    'duration': program['duration']
                }
            )
        return qualifyingPrograms
