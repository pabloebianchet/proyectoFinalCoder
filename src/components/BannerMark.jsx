import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function CustomSurplusAvatars() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        maxWidth: 1200,
      }}
    >
      <AvatarGroup
        renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
        total={4251}
      >
        <Avatar
          alt=""
          src="https://i.pinimg.com/564x/45/2b/a9/452ba9ff91b9801e47a8a4f040cdb769.jpg"
        />
        <Avatar
          alt=""
          src="https://i.pinimg.com/564x/c8/33/29/c8332919c813b850727f61008fa4b36c.jpg"
        />
        <Avatar
          alt=""
          src="https://i.pinimg.com/564x/ab/a7/75/aba77522870973c769e9f62e18fa054f.jpg"
        />
        <Avatar
          alt=""
          src="https://i.pinimg.com/564x/3a/12/78/3a12787fa83167c910c17f2f4e987c77.jpg"
        />
      </AvatarGroup>
    </div>
  );
}
