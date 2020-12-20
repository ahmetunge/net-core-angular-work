using BlackJack.Interfaces;
using BlackJack.Models;
using BlackJack.Models.BlackJackCard;
using System;
using System.Collections.Generic;

namespace BlackJack
{
    class Program
    {
        static void Main(string[] args)
        {
            List<ICard> cards = GetCards();

            IDeck blackJackDeck = new Deck(cards);

            var deckCards = blackJackDeck.GetCards();

            foreach (var card in deckCards)
            {
                var val = card as BlackJackCard;
                Console.WriteLine($"{val.Name} - {val.Value}");
            }

           // Console.WriteLine("Hello World!");
        }

        private static List<ICard> GetCards()
        {
            List<ICard> cards = new List<ICard>
            {
                new BlackJackCard(10,"Queen"),
                new BlackJackCard(10,"King"),
                new BlackJackCard(10,"Jack"),
                new BlackJackCard(1,"Ace"),
                new BlackJackCard(11,"Ace"),
            };

            return cards;

        }
    }
}
