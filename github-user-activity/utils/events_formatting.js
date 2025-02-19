const aux = require("./auxiliar");

class GitHubEvent {
    constructor(event) {
        this.repo = event.repo.name;
        this.is_public = event.public;
        this.creation_date = event.created_at.replace("T", " ").slice(0, -1);
    }
}

// A class for each GitHub Event
class CommitCommentEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public && this.action === "create") {
            return `\t- Created a commit comment at ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class CreateEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.ref_type = raw_event.payload.ref_type;
    }

    get_content() {
        if (this.is_public) {
            return `\t- Created a ${this.ref_type} at ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class DeleteEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.ref_type = raw_event.payload.ref_type;
    }

    get_content() {
        if (this.is_public) {
            return `\t- Deleted a ${this.ref_type} from ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class ForkEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.forkee = raw_event.payload.forkee.full_name ? raw_event.payload.forkee.full_name : "a private repository";
        this.private = raw_event.payload.forkee.private;
    }

    get_content() {
        if (this.is_public) {
            return `\t- Forked from ${this.repo} to ${this.forkee} (${this.creation_date})`;
        }

        return "";
    }
}

class GollumEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.number_of_created_pages = raw_event.payload.pages.filter(page => page.action === "created");
        this.number_of_edited_pages = raw_event.payload.pages.filter(page => page.action === "edited");
    }

    get_content() {
        if (this.is_public) {
            return `\t- Created ${this.number_of_created_pages} pages at the wiki of ${this.repo} (${this.creation_date})`;
            return `\t- Edited ${this.number_of_edited_pages} pages at the wiki of ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class IssueCommentEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} an issue coment at ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class IssuesEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a member at ${this.repo} (${this.creation_date})`;
        }

        return "";
    }
}

class PublicEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
    }

    get_content() {
        return `\t- Made the repository ${this.repo} public (${this.creation_date})`
    }
}

class PullRequestEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action =   raw_event.payload.action === "review_request" ? "requested a review" :
                        raw_event.payload.action === "review_request_removed" ? "removed a request of review" :
                        raw_event.payload.action === "synchronize" ? "synchronized" : raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a pull request at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class PullRequestReviewEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a pull request review at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class PullRequestReviewCommentEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a pull request review comment at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class PullRequestReviewThreadEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a pull request review thread at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class PushEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.number_of_commits = raw_event.payload.size;
    }

    get_content() {
        if (this.is_public) {
            return `\t- Pushed ${this.number_of_commits} commit${this.number_of_commits > 1 ? "s" : ""} to ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class ReleaseEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a release at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class SponsorshipEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} a sponsorship at ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

class WatchEvent extends GitHubEvent {
    constructor(raw_event) {
        super(raw_event);
        this.action = raw_event.payload.action;
    }

    get_content() {
        if (this.is_public) {
            return `\t- ${aux.capitalize(this.action)} the repository ${this.repo} (${this.creation_date})`
        }

        return "";
    }
}

const EVENTS_CLASSES = {
    "CommitCommentEvent": event => new CommitCommentEvent(event),
    "CreateEvent": event => new CreateEvent(event),
    "DeleteEvent": event => new DeleteEvent(event),
    "ForkEvent": event => new ForkEvent(event),
    "GollumEvent": event => new GollumEvent(event),
    "IssueCommentEvent": event => new IssueCommentEvent(event),
    "IssuesEvent": event => new IssuesEvent(event),
    "PublicEvent": event => new PublicEvent(event),
    "PullRequestEvent": event => new PullRequestEvent(event),
    "PullRequestReviewEvent": event => new PullRequestReviewEvent(event),
    "PullRequestReviewCommentEvent": event => new PullRequestReviewCommentEvent(event),
    "PullRequestReviewThreadEvent": event => new PullRequestReviewThreadEvent(event),
    "PushEvent": event => new PushEvent(event),
    "ReleaseEvent": event => new ReleaseEvent(event),
    "SponsorshipEvent": event => new SponsorshipEvent(event),
    "WatchEvent": event => new WatchEvent(event)
}

module.exports = {
    EVENTS_CLASSES
}