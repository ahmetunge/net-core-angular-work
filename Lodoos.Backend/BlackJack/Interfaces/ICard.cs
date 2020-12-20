using System;
using System.Collections.Generic;
using System.Text;

namespace BlackJack.Interfaces
{
    public interface ICard:ICardValue
    {
        string Name { get; set; }
    }
}
