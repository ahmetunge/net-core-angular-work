using System;
using System.Collections;

namespace StackArray
{
    class Program
    {
        static void Main(string[] args)
        {
            var stacks = GetStacks();

            foreach (var stack in stacks)
            {
                Console.WriteLine(stack.Pop());
            }
        }

        static Stack[] GetStacks()
        {
            Stack[] stacks = new Stack[3];

            Stack firstStack = new Stack();
            firstStack.Push("I am first stack");
            stacks[0] = firstStack;

            Stack secondStack = new Stack();
            secondStack.Push("I am scond stack");
            stacks[1] = secondStack;

            Stack thirthStack = new Stack();
            thirthStack.Push("I am thirth stack");
            stacks[2] = thirthStack;

            return stacks;
        }
    }
}
