# TrueFocus

TrueFocus is a web application designed to help users enhance productivity and maintain focus through effective task management and time tracking. Hosted on Netlify, TrueFocus provides a seamless and intuitive user experience for individuals aiming to achieve their goals efficiently.

## Features
- **Task Management**: Create, edit, and delete tasks with ease.
- **Pomodoro Timer**: Use the built-in timer to work in focused intervals.
- **Progress Tracking**: Visualize your productivity with daily and weekly stats.
- **Cross-Platform**: Access TrueFocus on any device via the web.

## Installation
To run TrueFocus locally, follow these steps:

1. **Clone the Repository**  
   ```
   git clone https://github.com/CodeGeniusDev/Daily-Reminder.git
   ```

2. **Navigate to the Project Directory**  
   ```
   cd Daily-Reminder
   ```

3. **Install Dependencies**  
   Ensure you have Node.js installed, then run:
   ```
   npm install
   ```

4. **Start the Development Server**  
   ```
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Usage
- **Add Tasks**: Use the task input field to create new tasks.
- **Start a Focus Session**: Click on the Pomodoro timer to begin a 25-minute focus session.
- **Track Progress**: View your productivity stats on the dashboard.
- **Customize Settings**: Adjust timer durations and notification preferences in the settings menu.

## Deployment
TrueFocus is deployed on Netlify. To deploy your own instance:

1. **Push Your Code to GitHub**  
   Ensure your repository is on GitHub.

2. **Connect to Netlify**  
   - Log in to Netlify (https://app.netlify.com/).
   - Click "New site from Git" and select your GitHub repository.
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist` (or your build output folder)
   - Click "Deploy site".

3. **Custom Domain (Optional)**  
   In Netlify, go to "Domain settings" to add a custom domain or use the default Netlify subdomain.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or support, reach out via [GitHub Issues](https://github.com/CodeGeniusDev/Daily-Reminder/issues).