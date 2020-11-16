# To Do

- [ ] Implement auto save
- [ ] Add user schema/controller
- [ ] Add auth middleware (JWT)
- [ ] Draft and published status for stories
- [ ] Improve toolbar with more heading styles, bold, italic, lists, blockquote, etc
- [ ] Flush out ui/ux
- [ ] Add tests
- [ ] Add github actions for ci/cd

## Editor Architecture

### Content Data

- ElementData (**array**)

### Element Data

- Id (**number**)
- Type (**string**)
- Tag (**string**)
- Text (**string**)

- [ ] New story
- [ ] Edit story
- [ ] Delete story
- [ ] Refactor dirty state handling
- [ ] Allow sorting of elements
- [ ] Refactor how ids are set for elements
- [ ] Add sanitization on paste or save