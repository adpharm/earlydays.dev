// src/pages/admin-data.tsx

import React from "react";
import { CustomButton } from "@/components/CustomButton";

interface PostRow {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  readTime: number | null;
  tags: string | null;
  author: string;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  gitUrl?: string | null;
  profileSrc?: string | null;
}

export type YourPosts = {
  title: string;
  dateCreated: Date;
  dateUpdated: Date;
  readTime: number | null;
  labels: string | null;
  editPost: React.ReactNode;
};

export type OtherPosts = {
  title: string;
  dateCreated: Date;
  dateUpdated: Date;
  readTime: number | null;
  labels: string | null;
  createdBy: string;
  editPost: React.ReactNode;
};

export type User = {
  name: string;
  email: string;
  githubUrl: string;
  profileSrc: string;
  numberOfPosts: number;
  editUser: React.ReactNode;
};

export function shapeYourPosts(rows: PostRow[]): YourPosts[] {
  return rows.map((p) => ({
    title: p.title,
    dateCreated: p.createdAt,
    dateUpdated: p.updatedAt,
    readTime: p.readTime,
    labels: p.tags,
    editPost: <CustomButton content="Edit" href={`/posts/${p.id}/edit`} dark />,
  }));
}

export function shapeOtherPosts(rows: PostRow[]): OtherPosts[] {
  return rows.map((p) => ({
    title: p.title,
    dateCreated: p.createdAt,
    dateUpdated: p.updatedAt,
    readTime: p.readTime,
    labels: p.tags,
    createdBy: p.author, // Could store the entire user object if needed
    editPost: <CustomButton content="Edit" href={`/posts/${p.id}/edit`} dark />,
  }));
}
export function shapeAllUsers(
  users: UserRow[],
  userCountsMap: Map<string, number>
): User[] {
  return users.map((u) => ({
    name: u.name,
    email: u.email,
    githubUrl: u.gitUrl || "",
    profileSrc: u.profileSrc || "",
    numberOfPosts: userCountsMap.get(u.name) ?? 0, // or userCountsMap.get(String(u.id))
    editUser: <CustomButton content="Edit" href={`/users/${u.id}/edit`} dark />,
  }));
}
