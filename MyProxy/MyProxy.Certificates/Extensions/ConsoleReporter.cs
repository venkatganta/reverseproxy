using System;
using System.IO;

namespace Microsoft.Extensions.Tools.Internal
{
    public class ConsoleReporter : IReporter
    {
        private object _writeLock = new object();

        public ConsoleReporter(IConsole console)
            : this(console, verbose: false, quiet: false)
        { }

        public ConsoleReporter(IConsole console, bool verbose, bool quiet)
        {
            Ensure.NotNull(console, nameof(console));

            Console = console;
            IsVerbose = verbose;
            IsQuiet = quiet;
        }

        protected IConsole Console { get; }
        public bool IsVerbose { get; set; }
        public bool IsQuiet { get; set; }

        protected virtual void WriteLine(TextWriter writer, string message, ConsoleColor? color)
        {
            lock (_writeLock)
            {
                if (color.HasValue)
                {
                    Console.ForegroundColor = color.Value;
                }

                writer.WriteLine(message);

                if (color.HasValue)
                {
                    Console.ResetColor();
                }
            }
        }

        public virtual void Error(string message)
            => WriteLine(Console.Error, message, ConsoleColor.Red);
        public virtual void Warn(string message)
            => WriteLine(Console.Out, message, ConsoleColor.Yellow);

        public virtual void Output(string message)
        {
            if (IsQuiet)
            {
                return;
            }
            WriteLine(Console.Out, message, color: null);
        }

        public virtual void Verbose(string message)
        {
            if (!IsVerbose)
            {
                return;
            }

            WriteLine(Console.Out, message, ConsoleColor.DarkGray);
        }
    }

    internal static class Ensure
    {
        public static T NotNull<T>(T obj, string paramName)
            where T : class
        {
            if (obj == null)
            {
                throw new ArgumentNullException(paramName);
            }
            return obj;
        }

        public static string NotNullOrEmpty(string obj, string paramName)
        {
            if (string.IsNullOrEmpty(obj))
            {
                throw new ArgumentException("Value cannot be null or an empty string.", paramName);
            }
            return obj;
        }
    }
}