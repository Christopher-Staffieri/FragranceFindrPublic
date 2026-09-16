
import { useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, User, Sparkles, Eye, ChevronDown, ChevronUp, ArrowLeft, FileText, Link2, MessageSquare, Edit3, Plus, ExternalLink, X, ImageIcon, Tag, Send } from 'lucide-react'
import { Badge } from '../components/research/common/StatusBadge'
import { Button } from '../components/MainButton'
import { Card } from '../components/database/perfumeDetails/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/common/dialog'
import { Textarea } from '../components/TextArea'

const mockDiscussionPosts = [
  {
    id: '1',
    user: {
      username: 'Frankie',
      avatar: '/placeholder.svg?height=40&width=40',
      badge: 'Final Verifier'
    },
    postedAt: '2025-01-18T04:00:00Z',
    content: 'IMO, something is missing.',
    images: [
      '/perfume-packaging.jpg',
      '/amber-perfume.jpg'
    ]
  }
]

export default function ViewProposedPerfumeDiscussion() {
    const [isWritePostOpen, setIsWritePostOpen] = useState(false)
    const [discussionPost, setDiscussionPost] = useState('')

    function getTimeAgo(dateString: string) {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMs = now.getTime() - date.getTime()
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        
        if (diffInDays === 0) return 'today'
        if (diffInDays === 1) return '1 day ago'
        return `${diffInDays} days ago`
        }

    return (
        <div className="space-y-6 animate-fade-in">
                {/* Discussion Header with Write Post Button */}
                <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-transparent dark:from-purple-500/5 border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                        POST <span className="text-purple-600 dark:text-purple-400">{mockDiscussionPosts.length}</span>
                      </h2>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Community discussion about this proposal
                      </p>
                    </div>
                    
                    {/* Write Post Dialog */}
                    <Dialog open={isWritePostOpen} onOpenChange={setIsWritePostOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Write Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                            Write Post
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Discussion Post Textarea */}
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Share your thoughts about this proposal..."
                              value={discussionPost}
                              onChange={(e) => setDiscussionPost(e.target.value)}
                              className="min-h-[200px] bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border resize-none text-light-text-primary dark:text-dark-text-primary"
                              maxLength={1000}
                            />
                            <p className="text-sm text-light-primary dark:text-dark-primary text-right font-medium">
                              {1000 - discussionPost.length} Characters left
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4">
                            <Button
                              className="flex-1 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                              onClick={() => {
                                // Handle post submission
                                setIsWritePostOpen(false)
                                setDiscussionPost('')
                              }}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-light-border dark:border-dark-border"
                              onClick={() => {
                                setIsWritePostOpen(false)
                                setDiscussionPost('')
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>

                {/* Discussion Posts List */}
                <div className="space-y-4">
                  {mockDiscussionPosts.length > 0 ? (
                    mockDiscussionPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-300"
                      >
                        {/* Post Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={post.user.avatar || "/placeholder.svg"}
                            alt={post.user.username}
                            className="w-10 h-10 rounded-full border-2 border-light-border dark:border-dark-border"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-light-text-primary dark:text-dark-text-primary">
                                {post.user.username}
                              </span>
                              {post.user.badge && (
                                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                                  {post.user.badge}
                                </Badge>
                              )}
                              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                {getTimeAgo(post.postedAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-light-text-primary dark:text-dark-text-primary mb-4">
                          {post.content}
                        </p>

                        {/* Post Images */}
                        {post.images && post.images.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {post.images.map((image, idx) => (
                              <div
                                key={idx}
                                className="w-24 h-24 rounded-lg overflow-hidden border border-light-border dark:border-dark-border hover:scale-105 transition-transform duration-200 cursor-pointer"
                              >
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Post image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <Card className="p-12 text-center">
                      <MessageSquare className="w-16 h-16 text-light-text-secondary/40 dark:text-dark-text-secondary/40 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                        No discussions yet
                      </p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Be the first to start the conversation about this proposal
                      </p>
                    </Card>
                  )}
                </div>
              </div>
    )
}