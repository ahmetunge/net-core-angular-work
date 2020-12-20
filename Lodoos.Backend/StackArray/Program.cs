using StackArray.IteratorPattern;
using System;
using System.Collections;

namespace StackArray
{
    class Program
    {
        static void Main(string[] args)
        {
           
            StackCollection stacks = new StackCollection();

            Stack firstStack = new Stack();
            firstStack.Push("I am first stack");

            Stack secondStack = new Stack();
            secondStack.Push("I am second stack");

            Stack thirthStack = new Stack();
            thirthStack.Push("I am thirth stack");

            stacks[0] = firstStack;
            stacks[1] = secondStack;
            stacks[2] = thirthStack;

            StackIterator stackIterator = new StackIterator(stacks);

            stackIterator.StepSize = 1;

            for (
                Stack stack = stackIterator.First()
                    ; stackIterator.IsContinue
                    ; stack = stackIterator.MoveNext()
                    )
            {
                Console.WriteLine(stack.Pop());
            }



        }
    }
}
