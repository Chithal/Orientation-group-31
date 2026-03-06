def get_mark(i):
    while True:
        try:
            m = float(input(f"Enter mark for subject {i+1}: ").strip())
            if 0 <= m <= 100:
                return m
            print("Please enter a number between 0 and 100.")
        except ValueError:
            print("Invalid input — enter a numeric mark.")

def grade_from_average(avg):
    if avg >= 75:
        return "A"
    if avg >= 60:
        return "B"
    if avg >= 40:
        return "C"
    return "Fail"

def main():
    while True:
        name = input("Enter student's name (or type Exit to quit): ").strip()
        if name.lower() == "exit":
            print("Exiting.")
            break
        marks = [get_mark(i) for i in range(3)]
        avg = sum(marks) / 3
        grade = grade_from_average(avg)

        print("-" * 30)
        print(f"Name    : {name}")
        print(f"Average : {avg:.1f}")
        print(f"Grade   : {grade}")
        print("-" * 30)

if __name__ == "__main__":
    main()