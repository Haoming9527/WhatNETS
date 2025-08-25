# WhatNETS - NETS x WhatsApp Integration Prototype

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Hackathon-PolyFinTech100%202025-orange.svg)]()

A prototype demonstrating the integration of NETS payment functionality within WhatsApp's messaging interface. This project was developed for the **PolyFinTech100 API Hackathon 2025** to showcase how seamless payment experiences can be embedded into familiar messaging platforms.

## 🎯 Project Overview

WhatNETS proposes a strategic collaboration between NETS and WhatsApp to increase adoption and usage of NETS among youth. The prototype demonstrates how payment functionality can be seamlessly integrated into a familiar messaging platform, providing users with a convenient way to make payments during their conversations.

### Key Features

- **WhatsApp-like Interface**: Authentic messaging platform simulation
- **NETS Payment Integration**: QR code generation for payment processing
- **Real-time Transaction Status**: Success/failure status tracking
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Secure Payment Flow**: End-to-end payment simulation

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WhatNETS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 How It Works

### User Flow

1. **WhatsApp Interface**: Users interact with a familiar WhatsApp-like chat interface
2. **NETS Button**: Click the NETS button in the navigation to initiate payment
3. **Amount Input**: Enter the payment amount on the payment page
4. **QR Code Generation**: System generates a QR code based on the entered amount
5. **Payment Processing**: Scan the QR code using the NETS Payment Simulator App
6. **Status Confirmation**: View transaction success or failure status

### Demo Walkthrough

1. Start at the home page with the WhatsApp interface
2. Click the NETS icon in the top navigation
3. Enter a payment amount (e.g., $10.00)
4. Generate and scan the QR code
5. View the transaction status page

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Routing**: React Router DOM 6.23.1
- **UI Components**: Material-UI 5.15.20
- **Icons**: Font Awesome 6.7.2, React Icons 5.5.0
- **HTTP Client**: Axios 1.7.2
- **Cryptography**: js-sha256 0.11.0
- **Styling**: CSS3 with custom components

## 📁 Project Structure

```
WhatNETS/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   └── WhatsApp.ico       # App icon
├── src/
│   ├── assets/            # Images and static files
│   │   ├── NETSPay.png
│   │   ├── WhatsApp.png
│   │   └── ...
│   ├── netsQr/            # NETS QR functionality
│   │   └── views/
│   │       ├── HomePage.jsx
│   │       └── netsQrSamplePage.jsx
│   ├── txnNetsStatus/     # Transaction status pages
│   │   └── views/
│   │       ├── txnNetsSuccessStatusPage.jsx
│   │       └── txnNetsFailStatusPage.jsx
│   ├── App.js             # Main application component
│   ├── config.js          # Configuration settings
│   └── index.js           # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🎨 Features

### WhatsApp Interface Simulation
- Authentic chat interface with contact list
- Realistic message bubbles and timestamps
- Search functionality and navigation icons
- Desktop notification prompts

### NETS Payment Integration
- QR code generation based on payment amount
- Secure payment flow simulation
- Integration with NETS Payment Simulator App
- Real-time transaction status updates

### User Experience
- Intuitive navigation between chat and payment
- Responsive design for mobile and desktop
- Loading states and progress indicators
- Clear success/failure feedback

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |
| `npm run eject` | Ejects from Create React App |

### Development

```bash
npm start
```
- Opens [http://localhost:3000](http://localhost:3000)
- Hot reloading enabled
- Console displays lint errors

### Production Build

```bash
npm run build
```
- Creates optimized production build
- Minified and hashed filenames
- Ready for deployment

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_NETS_ENDPOINT=your_nets_endpoint
```

## 📱 Mobile Responsiveness

The application is designed with a mobile-first approach and includes:
- Responsive breakpoints for different screen sizes
- Touch-friendly interface elements
- Optimized layouts for mobile devices
- Progressive Web App capabilities

## 🔒 Security Considerations

- This is a prototype for demonstration purposes
- No real financial transactions are processed
- QR codes are generated for simulation only
- All payment data is mock data

## 🤝 Contributing

This project was developed as part of the PolyFinTech100 API Hackathon 2025. For contributions or questions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**This is a prototype developed for educational and demonstration purposes only.**

- Not an official integration of NETS or WhatsApp
- No real financial transactions are processed
- Built solely for the PolyFinTech100 API Hackathon 2025
- Demonstrates technical feasibility and user experience concepts

## 🙏 Acknowledgments

- **PolyFinTech100 API Hackathon 2025** for the opportunity
- **NETS** for providing the payment infrastructure
- **WhatsApp** for the messaging platform inspiration
- **React Community** for the excellent development tools

## 📞 Support

For questions or support regarding this prototype:
- Create an issue in the repository
- Contact the development team
- Refer to the hackathon documentation

---

**Built with ❤️ for the PolyFinTech100 API Hackathon 2025**
