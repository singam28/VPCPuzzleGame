import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Button } from "./components/ui/Button.jsx";

// Shuffle function (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const puzzles = [
    { question: "Which AWS service lets you create a private network?", options: ["Amazon VPC", "AWS Direct Connect", "AWS PrivateLink", "AWS Transit Gateway"], answer: "Amazon VPC" },
    { question: "A VPC CIDR block defines what?", options: ["IP address range for your VPC", "Security rules for your VPC", "Cost of your VPC", "Region of your VPC"], answer: "IP address range for your VPC" },
    { question: "How can you connect two VPCs together?", options: ["VPC Peering", "NAT Gateway", "Internet Gateway", "AWS Direct Connect"], answer: "VPC Peering" },
    { question: "What does a NAT Gateway allow instances in a private subnet to do?", options: ["Access the internet", "Receive internet traffic", "Communicate with other VPCs", "Bypass security groups"], answer: "Access the internet" },
    { question: "What does an Internet Gateway provide to your VPC?", options: ["Internet access", "VPN connection", "Direct connection to your data center", "Load balancing"], answer: "Internet access" },
    { question: "Which service connects multiple VPCs in a hub-and-spoke design?", options: ["AWS Transit Gateway", "VPC Peering", "AWS Direct Connect", "AWS VPN Gateway"], answer: "AWS Transit Gateway" },
    { question: "Security Groups are like digital bouncers at a party 🎉. What do they control?", options: ["Who gets in and out (traffic)", "The music playlist 🎶", "The snack selection 🍕", "The guest list 📝"], answer: "Who gets in and out (traffic)" },
    { question: "VPC Flow Logs are like a CCTV camera 📹 for your network. What information do they capture?", options: ["Who's talking to whom (traffic)", "Instance CPU temperature 🌡️", "Amount of data stored 💾", "User passwords 🔑"], answer: "Who's talking to whom (traffic)" },
    { question: "What does AWS Direct Connect provide?", options: ["Dedicated network connection to AWS", "Free internet access", "Automatic security updates", "Unlimited storage"], answer: "Dedicated network connection to AWS" },
    { question: "Which service provides private connectivity to AWS services from your VPC?", options: ["AWS PrivateLink", "VPC Peering", "AWS Direct Connect", "AWS VPN Gateway"], answer: "AWS PrivateLink" },
    { question: "What defines if a subnet is public or private?", options: ["Route table configuration", "Security group rules", "Network ACLs", "IAM permissions"], answer: "Route table configuration" },
    { question: "What does a Network ACL control?", options: ["Traffic at the subnet level", "Traffic at the instance level", "User access to AWS resources", "Encryption keys"], answer: "Traffic at the subnet level" },
    { question: "What type of subnet should a web server be in if it needs to be accessed from the internet?", options: ["Public subnet", "Private subnet", "Isolated subnet", "It doesn't matter"], answer: "Public subnet" },
    { question: "What is the purpose of a NAT Gateway in relation to private subnets?", options: ["Allows private subnets to access the internet", "Protects public subnets from attacks", "Connects VPCs together", "Encrypts data"], answer: "Allows private subnets to access the internet" },
    { question: "What is the main function of a VPN Gateway?", options: ["Create a secure connection", "Speed up network traffic", "Block unwanted traffic", "Manage user permissions"], answer: "Create a secure connection" },
    { question: "What is a key difference between Security Groups and Network ACLs?", options: ["Security Groups are stateful", "Network ACLs are stateful", "Security Groups are stateless", "They function identically"], answer: "Security Groups are stateful" },
    { question: "What does 'stateful' mean for Security Groups?", options: ["Return traffic is automatically allowed", "Return traffic is automatically blocked", "You must create specific rules for return traffic", "It only applies to outbound traffic"], answer: "Return traffic is automatically allowed" },
    { question: "Why might you choose to create a custom VPC?", options: ["More control over network settings", "Lower cost", "Faster performance", "Easier setup"], answer: "More control over network settings" },
    { question: "What happens if two VPCs have overlapping CIDR blocks when trying to peer?", options: ["Peering will fail", "Traffic will be routed randomly", "AWS will reconfigure CIDR blocks", "Peering will still work"], answer: "Peering will fail" },
    { question: "Which AWS service is best for connecting your on-premises network to AWS?", options: ["AWS Direct Connect", "VPC Peering", "Internet Gateway", "NAT Gateway"], answer: "AWS Direct Connect" }
];

const totalQuestions = 20; // Define the total number of questions

export default function VPCPuzzleGame() {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Shuffle options when the component mounts or when the question changes
    useEffect(() => {
        setShuffledOptions(shuffleArray(puzzles[currentPuzzleIndex].options));
    }, [currentPuzzleIndex]);

    const checkAnswer = (option) => {
        setSelectedOption(option);
        if (option === puzzles[currentPuzzleIndex].answer) {
            setFeedback("✅ Correct!");
            setScore((prevScore) => prevScore + 1);
            setTimeout(() => nextPuzzle(), 1000);
        } else {
            setFeedback("❌ Incorrect. Try again!");
        }
    };

    const nextPuzzle = () => {
        setFeedback("");
        setSelectedOption(null);
        setShowAnswer(false);
        if (currentPuzzleIndex < puzzles.length - 1) {
            setCurrentPuzzleIndex((prevIndex) => prevIndex + 1);
        } else {
            setCompleted(true);
        }
    };

    const revealAnswer = () => {
        setShowAnswer(true);
    };

    const restartGame = () => {
        setCurrentPuzzleIndex(0);
        setScore(0);
        setCompleted(false);
        setFeedback("");
        setSelectedOption(null);
    };

    const alphabetLabels = ['A', 'B', 'C', 'D']; // Add more if you have more than 4 options

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-8">
            <div className="w-full max-w-md p-4">
                {!completed ? (
                    <Card className="w-full p-4 bg-white! shadow-md">
                        <CardContent>
                            <h2 className="text-xl font-bold mb-4">VPC Puzzle {currentPuzzleIndex + 1} of {totalQuestions}</h2>
                            <p className="mb-4">{puzzles[currentPuzzleIndex].question}</p>
                            <div className="flex flex-col gap-2">
                                {shuffledOptions.map((option, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => checkAnswer(option)}
                                        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedOption === option ? (option === puzzles[currentPuzzleIndex].answer ? 'bg-green-500' : 'bg-red-500') : ''}`}
                                    >
                                        {alphabetLabels[index]}. {option}
                                    </Button>
                                ))}
                            </div>
                            {feedback && <p className="mt-2 font-semibold">{feedback}</p>}
                            {showAnswer && <p className="text-green-500 font-semibold">Correct Answer: {puzzles[currentPuzzleIndex].answer}</p>}
                            <div className="mt-4 flex justify-between gap-4 mt-8">
                                <Button onClick={revealAnswer} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Show Answer</Button>
                                <Button onClick={nextPuzzle} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Skip</Button>
                            </div>
                            <p className="mt-4 font-bold">Score: {score} / {totalQuestions}</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center p-6 bg-green-200 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-green-800">🎉 Congratulations! 🎉</h2>
                        <p className="text-green-700 mt-2">You've completed all the VPC puzzles!</p>
                        <p className="text-green-700 font-bold mt-2">Your Score: {score} / {totalQuestions}</p>
                        <Button onClick={restartGame} className="mt-4">Restart Game</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
