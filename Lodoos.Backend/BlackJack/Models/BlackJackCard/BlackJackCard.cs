using BlackJack.Interfaces;
using BlackJack.Interfaces.BlackJackCard;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlackJack.Models.BlackJackCard
{
    public class BlackJackCard : ICard, IBlackJackCard
    {
        public BlackJackCard(int value, string name)
        {
            Value = value;
            Name = name;
        }
        public int Value { get ; set ; }
        public string Name { get ; set ; }
    }
}
