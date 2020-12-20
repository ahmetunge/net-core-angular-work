using BlackJack.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlackJack.Models
{
    public class Deck : IDeck
    {
        private readonly List<ICard> _cards;

        public Deck(List<ICard> cards)
        {
            _cards = cards;
        }
        public ICollection<ICard> GetCards()
        {
            return _cards;
        }


    }
}
