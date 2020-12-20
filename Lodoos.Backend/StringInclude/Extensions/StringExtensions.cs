using System;
using System.Collections.Generic;
using System.Text;

namespace StringInclude.Extensions
{
    public static class StringExtensions
    {
        public static string RemoveSelectedCharacter(this string value, char character)
        {
           var selectedIntex= value.IndexOf(character);

           var newValue = value.Remove(selectedIntex,1);

            return newValue;
        }
    }
}
