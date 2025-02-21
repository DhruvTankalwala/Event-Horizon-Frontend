"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { TextArea as Textarea, Button } from "./index";
import { Star } from "lucide-react";
import { registerFeedback } from "../apiEndPoints";
import toast from "react-hot-toast";

export function FeedbackForm({ onClose, eventName, eventId }) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await registerFeedback(eventId , {feedback , rating})
    console.log(res);
    
    if(res.statusCode == 201){
      toast.success(res.message)
      onClose();
      setFeedback("");
      setRating(0);
    }else{
      toast.error(res.message)
    }
    
  };
  
  return (
    <Dialog open="true" onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Give Feedback for {eventName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rating" className="block mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`focus:outline-none ${rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                >
                  <Star className="w-8 h-8" fill={rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="feedback" className="block mb-2">
              Your Feedback
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the event..."
              className="w-full h-32 bg-gray-700 text-white border-gray-600 focus:border-purple-500"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
