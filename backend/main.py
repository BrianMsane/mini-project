'''Run this script to execute the entire application backend

1. read the form data from the database
2. calculate the points
3. get the relevant programs (narrow down interns of stream and total points for top six subjects)
4. store this data (qualifying programs and username) in the database
5. return to the user the subjects they qualify for through the website(dynamic page)
'''


from db.mongo import read
from utils.ops import cal_points, rel_programs


def main():
    '''Running the entire application
    '''
    user_id: str=''
    user_data: dict = read(query={'user_id':user_id})
    user_points = cal_points(data=user_data)
    qualifyingPrograms = rel_programs(points=user_points, data=user_data, streams=None)
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


if __name__ == '__main__':
    main()
