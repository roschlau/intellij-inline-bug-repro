This repo serves to reproduce a suspected bug in IntelliJ's "inline" refactoring, reported here: https://youtrack.jetbrains.com/issue/WEB-77563

To trigger the bug, open [reproduction.ts](./src/reproduction.ts) in IntelliJ IDEA, then trigger the `Inline...` refactoring on the `uniqueArray` const and choose to inline all and remove the reference.

Instead of correctly inlining, the entire `this.categories$ = [...]` assignment is deleted as a result.

Recording of the behavior:

![](recording.mp4)
