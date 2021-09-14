import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Post = objectType({
	name: 'Post',
	definition(t) {
		t.int('id')
		t.string('title')
		t.string('body')
		t.boolean('published')
	},
})

export const PostQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('drafts', {   // returns unpublished posts
			type: 'Post',
			resolve(_root, _args, ctx) {
				return ctx.db.posts.filter(p => p.published === false)
			},
		})
		t.list.field('posts', {   // returns published posts
			type: 'Post',
			resolve(_root, _args, ctx) {
				return ctx.db.posts.filter(p => p.published === true)
			},
		})
	},
})

export const PostMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createDraft', {  // allows user to input a new draft
			type: 'Post',
			args: {
				title: nonNull(stringArg()),  // these get passed into the resolver
				body: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				const draft = {
					id: ctx.db.posts.length + 1,
					title: args.title,
					body: args.body,
					published: false,
				}
				ctx.db.posts.push(draft)
				return draft
			}
		})
		t.field('publish', {   // transforms a draft into a published post
			type: 'Post',
			args: {
				draftId: nonNull(intArg()),
			},
			resolve(_root, args, ctx) {
				let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId)

				if (!draftToPublish) {
					throw new Error('Could not find draft with id ' + args.draftId)
				}

				draftToPublish.published = true

				return draftToPublish
			}
		})
	},
})