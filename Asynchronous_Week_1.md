## **ticket.py**



import sys



\# Age less than 12 (age < 12): 120 Baht

\# Age between 12 and 60 (12 <= age <= 60): 200 Baht

\# Age over 60 (age > 60): 150 Baht



def calculate\_ticket\_price(age):

&#x20;   if age < 12:

&#x20;       return 120

&#x20;   elif 12 <= age <= 60:

&#x20;       return 200

&#x20;   else:

&#x20;       return 150





def main():

&#x20;   # เปลี่ยนมาเช็ก > 1 และใช้ sys.argv\[-1] เพื่อความแม่นยำใน VPL

&#x20;   if len(sys.argv) > 1:

&#x20;       test\_age = int(sys.argv\[-1])

&#x20;       result = calculate\_ticket\_price(test\_age)

&#x20;       print(result)

&#x20;   else:

&#x20;       test\_age = 25

&#x20;       result = calculate\_ticket\_price(test\_age)

&#x20;       print(f"Age: {test\_age} -> Ticket Price: {result} Baht")



if \_\_name\_\_ == "\_\_main\_\_":

&#x20;   main()



\---------------------------------------------------------------------------------------------------------------



## Grade.py



import sys



\# Score 80 or above (score >= 80): return "Excellent"

\# Score between 50 and 79 (50 <= score < 80): return "Pass"

\# Score less than 50 (score < 50): return "Fail"



def evaluate\_grade(score):

&#x20;   if score >= 80:

&#x20;       return "Excellent"

&#x20;   elif (50 <= score < 80):

&#x20;       return "Pass"

&#x20;   else:

&#x20;       return "Fail"



def main():

&#x20;   test\_score = 85

&#x20;   result = evaluate\_grade(test\_score)

&#x20;   print(f"Score: {test\_score} -> Grade: {result}")



if \_\_name\_\_ == "\_\_main\_\_":

&#x20;   main()



\---------------------------------------------------------------------------------------------------------------



## Web.py



import asyncio

import httpx



\# ฟังก์ชันดึงชื่อผู้ใช้แบบ Async ผ่าน HTTPS

async def get\_user\_name(user\_id):

&#x20;   url = f"https://jsonplaceholder.typicode.com/users/{user\_id}"

&#x20;   

&#x20;   async with httpx.AsyncClient() as client:

&#x20;       response = await client.get(url)

&#x20;       return response.json()\["name"]



async def main():

&#x20;   # รับแบบ Asynchronous ขนานกัน (ยิงพร้อมกัน 2 Requests)

&#x20;   name1, name2 = await asyncio.gather(get\_user\_name(1), get\_user\_name(2))

&#x20;   print(f"User 1: {name1} | User 2: {name2}")



if \_\_name\_\_ == "\_\_main\_\_":

&#x20;   asyncio.run(main())

