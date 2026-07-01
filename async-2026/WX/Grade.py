import sys

# Score 80 or above (score >= 80): return "Excellent"
# Score between 50 and 79 (50 <= score < 80): return "Pass"
# Score less than 50 (score < 50): return "Fail"

def evaluate_grade(score):
    if score >= 80:
        return "Excellent"
    elif (50 <= score < 80):
        return "Pass"
    else:
        return "Fail"

def main():
    test_score = 85
    result = evaluate_grade(test_score)
    print(f"Score: {test_score} -> Grade: {result}")

if __name__ == "__main__":
    main()