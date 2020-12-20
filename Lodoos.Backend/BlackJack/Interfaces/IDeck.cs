using System;
using System.Collections.Generic;
using System.Text;

namespace BlackJack.Interfaces
{
    public interface IDeck
    {
        public ICollection<ICard> GetCards();
    }
}
