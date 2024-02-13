export class Repository {
    constructor (
        public name: string,
        public html_url: string,
        public description: string,
        public created_at: Date,
        public language: string,
    ) {}
}