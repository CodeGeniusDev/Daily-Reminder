/*
  # Community Chat Schema

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key)
      - `content` (text, message content)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, anonymous user identifier)
      - `nickname` (text, temporary display name)
      - `reported` (boolean, for flagging inappropriate content)
      - `report_count` (integer, number of times message was reported)
      - `deleted` (boolean, soft delete flag)

  2. Security
    - Enable RLS on `chat_messages` table
    - Add policies for:
      - Anyone can read non-deleted messages
      - Users can create messages
      - Users can report messages
      - Users can only delete their own messages

  3. Functions
    - `report_message`: Increment report count and auto-delete if threshold reached
*/

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL,
  nickname text NOT NULL,
  reported boolean DEFAULT false,
  report_count integer DEFAULT 0,
  deleted boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create report message function
CREATE OR REPLACE FUNCTION report_message(message_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE chat_messages
  SET 
    report_count = report_count + 1,
    reported = true,
    deleted = CASE WHEN report_count >= 2 THEN true ELSE deleted END
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies
CREATE POLICY "Anyone can read non-deleted messages"
  ON chat_messages
  FOR SELECT
  USING (NOT deleted);

CREATE POLICY "Users can create messages"
  ON chat_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can report messages"
  ON chat_messages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete their own messages"
  ON chat_messages
  FOR DELETE
  USING (auth.uid() = user_id);