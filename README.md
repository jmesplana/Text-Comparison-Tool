# Text Comparison Tool

This Text Comparison Tool is a simple web application that allows users to compare two pieces of text, highlighting the differences between them. It provides a visual representation of added and removed content, along with word and character counts for each text.

## Features

- Side-by-side comparison of two text inputs
- Highlighting of added (green) and removed (red) content
- Word count for each text input
- Character count for each text input
- Count of added and removed items
- Line-by-line comparison

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [jsdiff library](https://github.com/kpdecker/jsdiff) for text comparison

## File Structure

```
text-comparison-tool/
│
├── index.html
├── styles.css
├── scripts.js
└── README.md
```

## Setup and Usage

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/yourusername/text-comparison-tool.git
   ```

2. Open the `index.html` file in a web browser.

3. In the left textarea, paste or type your original text.

4. In the right textarea, paste or type your modified text.

5. Click the "Compare" button to see the differences highlighted.

## How It Works

The tool uses the jsdiff library to compare the two input texts. It then processes the diff results to create HTML output with appropriate highlighting for added and removed content. The script also calculates word and character counts for each input, as well as the number of added and removed items.

## Customization

You can customize the appearance of the tool by modifying the `styles.css` file. The main components you might want to adjust are:

- `.container`: Controls the layout of the text input areas
- `.textarea-container`: Styles the containers for the textareas
- `.result-container`: Styles the output area where the comparison is displayed
- `.stats`: Styles the statistics display at the top of each output column
- `.added` and `.removed`: Control the highlighting colors for added and removed content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, please open an issue in this repository.
