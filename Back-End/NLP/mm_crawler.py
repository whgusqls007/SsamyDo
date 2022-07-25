import pandas as pd
from email import message
from mattermostdriver import Driver

foo = Driver({
        "url" : "meeting.ssafy.com",
        "login_id" : "email",
        "password": "pwd",
        "port" : 443,
    })

foo.login()

print("로그인 성공")

user_id = foo.users.get_user(user_id='me')['id']

user_teams = foo.teams.get_user_teams(user_id)

messages = []

for user_team in user_teams:
    team_id = user_team['id']

    channels = foo.teams.get_public_channels(team_id)
    for channel in channels:
        try:
            channel_id = channel['id']
            dictionary = foo.posts.get_posts_for_channel(channel_id)
            orders = dictionary['order']
            for order in orders:
                messages.append(dictionary['posts'][order]['message'])
            
        except:
            continue
            
df = pd.DataFrame(messages)
df['flag'] = 0
df.to_csv('mattermost_data.txt', sep='§')



        
# import pandas as pd

# df = pd.read_csv('mattermost_data.txt', sep="§")
# print(df)