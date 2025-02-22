import { useState } from "react";
import { Card, CardContent } from "./components/ui/Card.jsx";
import { Button } from "./components/ui/Button.jsx";
import { Input } from "./components/ui/Input.jsx";


export default function VPCPuzzleGame() {
  const puzzles = [
    { id: 1, question: "Your EC2 instance can't reach the internet. What should you check?", answer: "internet gateway" },
    { id: 2, question: "Two EC2 instances in different subnets can't talk. What's missing?", answer: "route table" },
    { id: 3, question: "Your private subnet instance needs internet access. What should you use?", answer: "nat gateway" },
    { id: 4, question: "You need to connect two VPCs. What AWS service do you use?", answer: "vpc peering" },
    { id: 5, question: "Which service allows you to centrally manage network traffic across multiple VPCs?", answer: "transit gateway" },
    { id: 6, question: "Your EC2 instance has no internet despite an Internet Gateway. What could be wrong?", answer: "security group" },
    { id: 7, question: "What AWS service can you use to expose an internal service to other VPCs securely?", answer: "privatelink" },
    { id: 8, question: "What is required to connect an AWS VPC with an on-premises data center?", answer: "vpn" },
    { id: 9, question: "Which AWS service can be used to establish a dedicated network connection between AWS and on-prem?", answer: "direct connect" },
    { id: 10, question: "Your EC2 instance cannot access S3 privately. What should you configure?", answer: "vpc endpoint" },
    { id: 11, question: "How can you restrict VPC traffic at the subnet level?", answer: "network acl" },
    { id: 12, question: "You need a static public IP for your EC2 instance. What should you use?", answer: "elastic ip" },
    { id: 13, question: "How do you create isolated network partitions in a VPC?", answer: "subnet" },
    { id: 14, question: "What should you configure to allow outbound internet access in a private subnet?", answer: "nat gateway" },
    { id: 15, question: "Which AWS feature lets you mirror network traffic for monitoring?", answer: "vpc traffic mirroring" },
    { id: 16, question: "What AWS feature helps prevent data exfiltration from a VPC?", answer: "vpc endpoint policy" },
    { id: 17, question: "How can you block access to malicious IPs at the VPC level?", answer: "aws network firewall" },
    { id: 18, question: "Which AWS service can help detect network threats in your VPC?", answer: "guardduty" },
    { id: 19, question: "You need to enforce compliance for traffic routing across multiple VPCs. What should you use?", answer: "route 53 resolver" },
    { id: 20, question: "How can you securely connect multiple AWS accounts without overlapping CIDR issues?", answer: "transit gateway" }
  ];

  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === puzzles[currentPuzzle].answer) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setUserAnswer("");
          setFeedback("");
        } else {
          setFeedback("🎉 You completed all puzzles!");
        }
      }, 1000);
    } else {
      setFeedback("❌ Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">AWS VPC Puzzle Game</h1>
      <Card className="w-96 p-4 text-center">
        <CardContent>
          <p className="text-lg mb-4">{puzzles[currentPuzzle].question}</p>
          <Input
            type="text"
            placeholder="Your answer..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="mb-4"
          />
          <Button onClick={checkAnswer}>Submit</Button>
          {feedback && <p className="mt-4 text-lg">{feedback}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
