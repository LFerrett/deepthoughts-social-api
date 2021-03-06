const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  { reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId(),},
    reactionBody: {type: String, required: true, trim: true, minlength: 1, maxlength: 280,},
    username: {type: String, required: true, trim: true,},
    createdAt: {type: Date, default: Date.now,},
  },
  { toJSON: {getters: true,},}
);

const ThoughtSchema = new Schema(
  { username: {type: String, required: true, trim: true, },
    thoughtText: {type: String, required: true, minlength: 1, maxlength: 280,},
    createdAt: {type: Date, default: Date.now,},
    reactions: [ReactionSchema],
  },
  { toJSON: {virtuals: true, getters: true, }, id: false,}
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
