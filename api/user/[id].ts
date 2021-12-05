import { VercelRequest, VercelResponse } from "@vercel/node"
import { pick } from "lodash"
import { client } from "../_lib/twitter"

export default function (req: VercelRequest, res: VercelResponse) {
  const {
    query: { id },
  } = req
  client()
    .accountsAndUsers.usersShow({ screen_name: id })
    .then((user_data) => {
      res.json({
        data: pick(
          user_data,
          "id",
          "name",
          "screen_name",
          "profile_background_color",
          "profile_image_url_https",
          "profile_banner_url"
        ),
        user_data,
      })
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}
