def get_amount(prompt):
    while True:
        try:
            v = float(input(prompt).strip())
            if v >= 0:
                return v
            print("Please enter a non-negative number.")
        except ValueError:
            print("Invalid input — enter a numeric value.")

def main():
    total = get_amount("Enter total monthly budget: ")
    expenses = []
    i = 1
    while True:
        s = input(f"Enter expense {i} (or type done to finish): ").strip()
        if s.lower() == "done":
            break
        try:
            v = float(s)
            if v < 0:
                print("Please enter a non-negative number.")
                continue
            expenses.append(v)
            i += 1
        except ValueError:
            print("Invalid input — enter a numeric value or 'done' to finish.")

    remaining = total - sum(expenses)

    print("\n" + "-" * 30)
    print(f"Total budget : {total:.2f}")
    for idx, e in enumerate(expenses, 1):
        print(f"Expense {idx}    : {e:.2f}")
    print(f"Remaining    : {remaining:.2f}")
    if remaining < 500:
        print("Warning: Low Funds")
    print("-" * 30)

if __name__ == "__main__":
    main()