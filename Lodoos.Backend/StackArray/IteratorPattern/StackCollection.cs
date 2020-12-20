using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace StackArray.IteratorPattern
{
    public class StackCollection : IStackCollection
    {
        private List<Stack> list = new List<Stack>();
        public IStackIterator GetIterator()
        {
            return new StackIterator(this);
        }

        public int StackCount
        {
            get { return list.Count; }
        }
        public Stack this[int index]
        {
            get { return list[index]; }
            set { list.Add(value); }
        }
    }
}
