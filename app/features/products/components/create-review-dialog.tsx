import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Form, useActionData } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import type { action } from "../pages/product-reviews-page";

export function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const actionData = useActionData<typeof action>();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          What do you think of this product?
        </DialogTitle>
        <DialogDescription>
          Share your thoughts and experiences with this product
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10" method="post">
        <div>
          <Label>
            Rating
            <small className="text-muted-foreground">
              What do you think of this product?
            </small>
          </Label>
          <div className="flex gap-2 mt-5">
            {["1", "2", "3", "4", "5"].map((star) => (
              <label
                key={star}
                className="relative"
                onMouseEnter={() => setHoveredStar(Number(star))}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <StarIcon
                  className="size-5 text-yellow-500"
                  fill={
                    hoveredStar >= Number(star) || rating >= Number(star)
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="opacity-0 h-px w-px absolute top-0 left-0"
                  onChange={() => setRating(Number(star))}
                />
              </label>
            ))}
          </div>
          {actionData?.formErrors?.rating && (
            <p className="text-red-500">
              {actionData.formErrors.rating.join(", ")}
            </p>
          )}
        </div>
        <InputPair
          textArea
          required
          name="review"
          label="Review"
          description="Minimum 1000 characters"
          placeholder="Tell us more about your experience with this product"
        />
        {actionData?.formErrors?.review && (
          <p className="text-red-500">
            {actionData.formErrors.review.join(", ")}
          </p>
        )}
        <DialogFooter>
          <Button>Submit review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
