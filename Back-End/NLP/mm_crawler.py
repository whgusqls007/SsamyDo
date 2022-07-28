import pandas as pd
from mattermostdriver import Driver
from requests import post


foo = Driver({
        "url" : "meeting.ssafy.com",
        "login_id" : "username",
        "password": "password",
        "port" : 443,
    })

foo.login()

print("로그인 성공")


# print(foo.users.get_user(user_id='me'))

user_id = foo.users.get_user(user_id='me')['id']

user_teams = foo.teams.get_user_teams(user_id)

messages = []
for user_team in user_teams:
    team_id = user_team['id']
    
    channels = foo.channels.get_channel_for_user(user_id, team_id)
    for channel in channels:
        if "공지" in channel['display_name']:
            try:
                channel_id = channel['id']
                dictionary = foo.posts.get_posts_for_channel(channel_id, {"since":1640962800})
                for post in dictionary['posts'].values():
                    if '팀에 가입' not in post['message'] and '채널에 추가' not in post['message'] and '채널에 들어' not in post['message']:
                        messages.append(post['message'])
                
            except:
                continue
            

print(messages)
            
df = pd.DataFrame(messages)
df['flag'] = 0
# df.to_csv('data.txt')
df.to_excel('labeldata.xls')



        
# import pandas as pd



# df = pd.read_csv('mattermost_data.txt', sep="§")
# print(df)