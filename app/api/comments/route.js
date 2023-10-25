import { NextRequest, NextResponse } from "next/server";
import comments from "@/data/comments";

export async function GET(req, res) {
  return NextResponse.json(comments);
}

export async function POST(req, res) {
  try {
    const data = await req.json();

    if (!data || !data.name || !data.comment) {
      return NextResponse.error(
        400,
        "Bad request. Name and comment are required."
      );
    }

    const newComment = {
      id: new Date(),
      name: data.name,
      text: data.comment,
    };
    comments.push(newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.error(500, "Internal Server Error");
  }
}

export async function PUT(req, res) {
  try {
    const data = await req.json();

    if (!data || !data.name || !data.comment) {
      return NextResponse.error(400, "Name and comment are required");
    }

    // Find the comment by name
    const existingComment = comments.find(
      (comment) => comment.name === data.name
    );

    if (!existingComment) {
      return NextResponse.error(404, "Comment not found");
    }

    // Update the comment text
    existingComment.text = data.comment;

    return NextResponse.json(
      { data: existingComment, message: "Comment successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(500, "Server error");
  }
}

export async function DELETE(req, res) {
  try {
    const data = await req.json();
    const id = data.id;

    const deletedComment = comments.find((comment) => comment.id === id);
    const deletedIndex = comments.findIndex((comment) => comment.id === id);

    if (!deletedComment) {
      return NextResponse.error(404, "Comment not found");
    }

    comments.splice(deletedIndex, 1);

    return NextResponse.json(
      {
        data: deletedComment,
        message: "Deleted successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error(500, "Server error");
  }
}
