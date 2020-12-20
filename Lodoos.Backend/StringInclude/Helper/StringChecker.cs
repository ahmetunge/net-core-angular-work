using StringInclude.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace StringInclude.Helper
{
    public static class StringChecker
    {
        public static bool CheckStrings(string firstValue, string secondValue)
        {
            string shortValue;
            string longValue;

            if(string.IsNullOrEmpty(firstValue) || string.IsNullOrEmpty(secondValue))
            {
                throw new ArgumentException("Values can not be null");
            }
            
            if (firstValue.Length >= secondValue.Length)
            {
                shortValue = secondValue;
                longValue = firstValue;
            }
            else
            {
                shortValue = firstValue;
                longValue = secondValue;
            }

            foreach (var character in shortValue)
            {
                if (!longValue.Contains(character))
                    return false;
                longValue = longValue.RemoveSelectedCharacter(character);
            }

            return true;
        }
    }
}
