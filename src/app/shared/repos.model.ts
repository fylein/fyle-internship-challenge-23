export class repos {
  constructor(
    public name: string,
    public forks: any,
    public visibility: string,
    public url: string,
    public watchers_count: any,
    public langs: any[] = [],
    public description : string = "No description avalible"
  ) {}
}
//using a shortcut to define the model instaed of the convincal method