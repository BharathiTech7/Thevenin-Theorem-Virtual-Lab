# ⚡ Virtual Electrical Engineering Laboratory

An interactive web-based Virtual Laboratory for performing **Thevenin's Theorem** experiments digitally.

This project recreates a physical electrical engineering laboratory environment in the browser, allowing students to interact with virtual electrical components, connect wires between terminals, take measurements, perform calculations, and verify experimental results.

---

## 📌 About the Project

During traditional laboratory sessions, students work with physical electrical components and measuring instruments. However, access to laboratory equipment may not always be available, especially during exam preparation or outside laboratory hours.

This project provides a browser-based virtual environment where students can perform the **Thevenin's Theorem experiment** interactively.

Instead of simply displaying circuit diagrams or theoretical information, the application allows users to:

- Connect virtual components using wires
- Interact with circuit terminals
- Operate virtual laboratory equipment
- Take electrical measurements
- Validate circuit connections
- Follow the experiment step by step
- Perform required calculations
- Verify the final experimental result

---

## 🚀 Key Features

### 🔌 Interactive Circuit Connections

Users can connect virtual circuit components by creating wires between terminals.

The application provides:

- Interactive terminals
- Wire connections
- Connection validation
- Terminal highlighting
- Visual feedback for connected terminals
- Automatic connection support for guided steps

---

### ⚡ Virtual Power Supply

The application provides a virtual power supply that allows users to:

- Switch the power supply ON/OFF
- Adjust the required voltage
- Connect the supply to the circuit
- Perform measurements during the experiment

The power supply state is controlled according to the current experiment stage.

---

### 📏 Virtual Measuring Instruments

The laboratory includes virtual instruments required for the experiment:

- Ammeter
- Voltmeter
- Digital Multimeter

These instruments can be connected to the appropriate circuit terminals and used to obtain experimental readings.

---

### 🧪 Thevenin's Theorem Experiment

The application guides the user through different stages of the Thevenin's Theorem experiment.

The experiment includes:

#### Case 1 — Measurement of RTH

The user connects the required terminals and uses the digital multimeter to determine the Thevenin resistance.

The application validates the connections and allows the measured resistance value to be added to the readings.

#### Case 2 — Measurement of VTH

The user connects the power supply and voltmeter according to the required circuit configuration.

The power supply can then be switched ON and adjusted to the required voltage before taking the voltmeter reading.

#### Case 3 — Measurement of IL

The user connects the ammeter according to the required circuit configuration and measures the load current.

The power supply remains at the required setting from the previous stage, while the application prevents unnecessary power-supply changes during this case.

---

## 🤖 AI Guide

The project includes an interactive **AI Guide** that helps students perform the experiment step by step.

The guide provides:

- Step-by-step instructions
- Contextual guidance
- Terminal highlighting
- Connection guidance
- Audio narration
- Experiment progress guidance
- Validation messages

The AI Guide helps students understand **which component to interact with and which terminals to connect** at each stage of the experiment.

---

## 💡 Interactive Terminal Highlighting

To make the experiment easier to follow, the application visually highlights terminals that are required for the current step.

The highlighting system works together with the AI Guide to indicate:

- Which terminal should be selected
- Which terminals should be connected
- Which terminals are already connected
- Which terminals require attention

This provides a more intuitive learning experience compared with a static circuit diagram.

---

## ✅ Connection Validation

The application validates user connections before allowing the experiment to proceed.

This helps prevent incorrect circuit configurations and provides immediate feedback to the user.

The system supports:

- Correct connection detection
- Incorrect connection detection
- Connection verification
- Automatic guided connections
- Connected-terminal visual feedback

---

## 🧮 Measurements & Calculations

The application provides an interface for recording experimental readings and performing the required calculations.

The workflow includes:

1. Performing the required circuit connections
2. Verifying the connections
3. Taking measurements
4. Adding readings
5. Performing calculations
6. Verifying the final result

---

## 🖨️ Report Generation

After completing the experiment and calculations, the application provides options to generate and print the experimental report.

This allows students to maintain a record of the completed virtual experiment.

---

## 🛠️ Technologies Used

- **React.js** — User interface and component-based development
- **JavaScript** — Application logic and experiment behavior
- **HTML5** — Application structure
- **CSS3** — Styling and interactive UI
- **jsPlumb** — Interactive circuit wiring and terminal connections
- **React Hooks** — State and lifecycle management
- **Browser Audio APIs** — Audio narration for the AI Guide

---

## 📂 Project Structure

The project follows a component-based React architecture.
``` text

src/
├── components/
│   ├── PowerSupply/
│   ├── Ammeter/
│   ├── Voltmeter/
│   ├── DigitalMultimeter/
│   ├── CircuitDiagram/
│   ├── EquipmentPanel/
│   ├── ActionButtons/
│   └── CalculationPanel/
│
├── hooks/
│   └── AI Guide / experiment logic
│
├── utils/
│   ├── Wiring logic
│   └── Terminal highlighting
│
├── App.jsx
└── main.jsx

⚙️ Installation

Clone the repository:

git clone <repository-url>

Navigate to the project directory:

cd <project-folder>

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local development URL shown in the terminal.

🎮 How to Use
Open the Virtual Laboratory application.
Start the Thevenin's Theorem experiment.
Set the required circuit component values.
Follow the instructions provided by the AI Guide.
Connect the required terminals using virtual wires.
Verify the circuit connections.
Perform the required measurements.
Add the readings.
Complete the required calculations.
Verify the final result.
Generate or print the experiment report.
🎓 Learning Objectives

This Virtual Laboratory helps students understand:

Thevenin's Theorem
Equivalent circuit concepts
Circuit connections
Voltage and current measurements
Resistance measurement
Practical use of electrical measuring instruments
Experimental verification
Step-by-step laboratory procedures
🌟 Why Virtual Labs?

Virtual laboratories provide students with an opportunity to practice experiments digitally without requiring continuous access to physical laboratory equipment.

This project aims to bridge the gap between theoretical learning and practical experimentation by providing an interactive environment that resembles the workflow of a real electrical engineering laboratory.

🔧 Development Highlights

Some of the major implementation aspects of the project include:

Developed reusable React components for laboratory equipment
Implemented interactive circuit connections using jsPlumb
Created dynamic experiment workflows
Implemented connection validation
Added terminal highlighting for guided interactions
Developed step-based AI Guide functionality
Added audio-based experiment guidance
Implemented measurement and calculation workflows
Added experiment completion and report-generation flow
Designed the application to provide an interactive laboratory experience rather than a static educational webpage
📚 Experiment
Thevenin's Theorem

The application provides an interactive environment for performing the Thevenin's Theorem experiment.

The experiment involves determining:

RTH — Thevenin Resistance
VTH — Thevenin Voltage
IL — Load Current

The measured values can then be used to verify the experimental result.

🔮 Future Enhancements

Possible future improvements include:

Adding more electrical engineering experiments
Supporting additional virtual measuring instruments
Adding more guided learning scenarios
Improving circuit simulation capabilities
Adding student progress tracking
Adding experiment history
Expanding AI-assisted laboratory guidance
Supporting additional circuit configurations
👨‍💻 Project Context

This project was developed as part of an internship with the Virtual Labs Project, Department of Electrical Engineering, IIT Roorkee.

The project focuses on using modern web technologies to create an interactive and accessible virtual laboratory experience for electrical engineering education.

🙏 Acknowledgements

Special thanks to the Virtual Labs Project, Department of Electrical Engineering, IIT Roorkee for the opportunity to work on this project.

Thanks to Prof. R. S. Anand for his supervision and support during the internship.
