using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace StackArray.IteratorPattern
{
    public class StackIterator : IStackIterator
    {
        private StackCollection _stacks;
        private int _currentIndex = 0;
        public int StepSize { get; set; }

        public StackIterator(StackCollection stackCollection)
        {
            _stacks = stackCollection;
        }
        public bool IsContinue
        {
            get { return _currentIndex < _stacks.StackCount; }
        }

        public Stack Current
        {
            get { return _stacks[_currentIndex]; }
        }

    public Stack First()
        {
            _currentIndex = 0;
            return _stacks[0];
        }

        public Stack MoveNext()
        {
            _currentIndex += StepSize;
            if (IsContinue) // Eğer takip eden bir eleman var ise geri döndürülür
                return _stacks[_currentIndex];
            else
                return null;
        }
    }
}
