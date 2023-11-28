import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-sd:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptshare as an AI prompting tool that helps you generate ideas for
        your next project.
      </p>

      <Feed />
    </section>
  )
}

export default Home
