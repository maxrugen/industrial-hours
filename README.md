# Industrial Hours Calculator

This simple web-based Industrial Hours Calculator allows you to convert time durations between different formats – hours and minutes. You can use it to calculate industrial hours for a given time input in either "hh:mm" or minutes format.

## Usage

1. Open Industrial Hours Calculator at [maxrugen.github.io/industrial-hours](https://maxrugen.github.io/industrial-hours), or serve it locally (see [Development](#development)).
2. Enter the duration in the input field.
3. Press Enter or click the "Calculate" button to convert the input into industrial hours.

## Format

- You can input time in either "hh:mm" format (minutes 00–59, any number of hours) or as minutes.
- To convert the other way, enter decimal hours with a dot or a comma. The result is rounded to the nearest minute.
- Industrial hours are formatted for the first language in your browser's language settings, e.g. "1.50" in English and "1,50" in German.
- The result repeats your input with its unit, so you can see how it was read. A whole number like "8" always means minutes.
- Examples:
  - "90" shows "90 min = 1.50 h", and "1:30" shows "1:30 = 1.50 h".
  - "100:00" shows "100:00 = 100.00 h".
  - "1,5" shows "1,5 h = 1:30".

## Development

The page uses ES modules, which browsers don't load from `file://`. Serve the folder over HTTP instead:

```sh
python3 -m http.server
```

Then open [localhost:8000](http://localhost:8000). Run the tests (Node 20 or newer, no dependencies) with:

```sh
npm test
```

## License

This Industrial Hours Calculator is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code.

## How to Contribute

If you find any issues or have suggestions for improvement, feel free to [open an issue](https://github.com/maxrugen/industrial-hours/issues) or create a pull request. We welcome contributions!

## Disclaimer

This Industrial Hours Calculator is a basic tool and should be used with caution. The author is not responsible for any inaccuracies or problems that may arise from its use.
