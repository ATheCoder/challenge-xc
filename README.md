# Code Challenge by XCoin

I find this particular code challenge very interesting. Especially, for a backend developer position. This is mainly because the idea of "Production Ready" code is different from person to person and I now believe this particular exercise can showcase the level of fluency of someone in backend development quite well.

To me, the idea of production ready code is one that:

1. **Works**: this means that there should be automated tests written for all functionalities provided by the project so that not only can we make sure that everything is working _right now_ but also that everything will work _in the future_. Also, this code base didn't work out of the box because of some sort of an error with the root cause of ts-node-dev and typescript versions having a conflict. (I don't quite remember.)

2. **Secure**: This means that all the inputs from the user should be validated and sanitized. This is to make sure that no obvious security flaws exist. I have used [Zod](https://www.npmjs.com/package/zod) schemas here.

3. **Deployable**: The project should be easily deployable. This can be easily achieved using a Dockerfile and CI/CD pipeline configuration. I only did the GitHub Pipeline for running the tests and building the Docker image.

4. **Maintainable**: Tests do a lot here because they can help detect bugs very early in the development cycle. Also, the code should be **DRY** (Do not repeat yourself) and as simple as possible. For example, I saw that in the favorites model, there were 3 fields called **favorite1**, **favorite2**, and **favorite3** which to me seems very rigid and overly complicated why not just make a single field with an array of strings called **favorites**? If you also want to force a maximum of 3 you can do so inside the validation step.

5. **Reliable**: This means that the code should work under load and if things fail they should fail gracefully and be as straightforward as possible for debugging. This means:

    a. **Logging**: I saw several `console.log`s inside the code. This is not particularly bad and can be a good first step for logging information. But once the application starts scaling or needs more reliability (Think Crypto exchange) there needs to be a reliable source for logs. I personally would go with [Logstash](https://www.elastic.co/logstash/) but I didn't have enough time to implement it.
    b. **Monitoring**: The functionality for this codebase is pretty limited and I couldn't exactly discern what was the use case (Maybe something to do with simulating Buying crypto?) but depending on the use case solutions such as Prometheus with Grafana might be good for monitoring.

6. **Scaleable**: This has both a devops aspect to it and a development aspect and is really where true backend engineering shines. In terms of devops containerizing the project and making Kubernetes deployments can go a long way toward scalability but this is only true if the code allows for such scalability. There might be functionalities that can be extracted into microservices or queues with worker containers (Think BullMQ, RabbitMQ, etc.). However, I find that this project currently does not have any needs in this area.