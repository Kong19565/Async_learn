import sys

# Age less than 12 (age < 12): 120 Baht
# Age between 12 and 60 (12 <= age <= 60): 200 Baht
# Age over 60 (age > 60): 150 Baht

def calculate_ticket_price(age):
    if age < 12:
        return 120
    elif 12 <= age <= 60:
        return 200
    else:
        return 150


def main():
    # เปลี่ยนมาเช็ก > 1 และใช้ sys.argv[-1] เพื่อความแม่นยำใน VPL
    if len(sys.argv) > 1:
        test_age = int(sys.argv[-1])
        result = calculate_ticket_price(test_age)
        print(result)
    else:
        test_age = 25
        result = calculate_ticket_price(test_age)
        print(f"Age: {test_age} -> Ticket Price: {result} Baht")

if __name__ == "__main__":
    main()