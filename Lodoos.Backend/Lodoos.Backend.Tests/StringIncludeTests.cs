using StringInclude.Helper;
using System;
using Xunit;

namespace Lodoos.Backend.Tests
{
    public class StringIncludeTests
    {
        [Theory, InlineData(new object[] { "baba", "abab" })]
        public void CheckStrings_IfFirstValueEqualToSecondValueAndInclude_ShouldReturnTrue(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue,secondValue);

            Assert.True(result);
        }

        [Theory, InlineData(new object[] { "baba", "abac" })]
        public void CheckStrings_IfFirstValueEqualToSecondValueAndNotInclude_ShouldReturnFalse(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue, secondValue);

            Assert.False(result);
        }

        [Theory, InlineData(new object[] { "baba", "abc" })]
        public void CheckStrings_IfFirstValueLengthLongerThanSecondValueLengthAndNotInclude_ShouldReturnFalse(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue, secondValue);

            Assert.False(result);
        }

        [Theory, InlineData(new object[] { "baba", "aab" })]
        public void CheckStrings_IfFirstValueLengthLongerThanSecondValueLengthAndInclude_ShouldReturnTrue(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue, secondValue);

            Assert.True(result);
        }

        [Theory, InlineData(new object[] { "ldm", "loodos" })]
        public void CheckStrings_IfFirstValueLengthShorterThanSecondValueLengthAndNotInclude_ShouldReturnFalse(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue, secondValue);

            Assert.False(result);
        }

        [Theory, InlineData(new object[] { "lds", "loodos" })]
        public void CheckStrings_IfFirstValueLengthShorterThanSecondValueLengthAndInclude_ShouldReturnTrue(string firstValue, string secondValue)
        {
            bool result = StringChecker.CheckStrings(firstValue, secondValue);

            Assert.True(result);
        }

        [Theory, InlineData(new object[] { null, "loodos" })]
        public void CheckStrings_IfFirstValueIsNull_ShouldThrowNullReferenceException(string firstValue, string secondValue)
        {
            Assert.Throws<ArgumentException>(() => StringChecker.CheckStrings(firstValue, secondValue));
        }

        [Theory, InlineData(new object[] { "loodos", null })]
        public void CheckStrings_IfSecondValueIsNull_ShouldThrowNullReferenceException(string firstValue, string secondValue)
        {
            Assert.Throws<ArgumentException>(() => StringChecker.CheckStrings(firstValue, secondValue));
        }
    }
}
