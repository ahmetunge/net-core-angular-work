using System;
using System.Collections.Generic;
using System.Text;

namespace StackArray.IteratorPattern
{
    public interface IStackCollection
    {
        IStackIterator GetIterator();
    }
}
