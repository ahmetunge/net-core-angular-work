using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace StackArray.IteratorPattern
{
    public interface IStackIterator
    {
        Stack First();
        Stack MoveNext();
        bool IsContinue { get; }
        Stack Current { get; }
    }
}
