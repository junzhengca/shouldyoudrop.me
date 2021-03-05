package main

import (
  "bufio"
  "fmt"
  "os"
  "strings"
)

func main() {
	fmt.Println("Welcome to shouldyoudrop.me CLI")
	MainMenu()
}

func MainMenu() {
	fmt.Println("Please enter a command, type 'help' for help.")
	for {
		fmt.Print("> ")
		cmd := readFromStdIn()
		switch cmd {
		case "help": ShowHelp()
		case "create": CreateCourse()
		default:
			fmt.Println("Invalid command, type 'help' for help.")
		}
	}
}

func ShowHelp() {
	fmt.Println("create: Create a new course and enters editing mode for that course.")
}

func CreateCourse() {
	fmt.Print("What is the name of your course? ")
	name := readFromStdIn()
	EditCourse(name)
}

func EditCourse(name string) {
	fmt.Println("You are editing " + name)
	for {
		fmt.Printf("(%s) > ", name)
		cmd := readFromStdIn()
		switch cmd {
		case "add": AddGradingItem()
		default:
			fmt.Println("Invalid command, type 'help' for help.")
		}
	}
}

func AddGradingItem() {
	fmt.Print("What is the name ")
}

func readFromStdIn() string {
	reader := bufio.NewReader(os.Stdin)
	cmd, _ := reader.ReadString('\n')
	cmd = strings.Replace(cmd, "\n", "", -1)
	return cmd
}
