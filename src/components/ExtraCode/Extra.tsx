//Code for Activity indicator
// const [loading,setloading]=useState(true);
//   useEffect(()=>{
//     const unsubscribe=navigation.addListener('focus',()=>{
//       setloading(true),
//       setTimeout(() => {
//         setloading(false)
//       }, 500);
//     })
//     return unsubscribe;
//   },[navigation])
//   if(loading){
//     return(
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator color={Colors.Primary} size="large" />
//       </View>
//     )
//   }
//Code For Theme
// const dispatch=useDispatch()
  // const themeMode = useSelector(state => state.theme.mode);
  // const [DarkMode, setDark] = React.useState(
  //   themeMode.mode == 'dark' ? true : false,
  // );
  // const handleTheme = () => {
  //   setDark(!DarkMode);
  //   dispatch(toggleTheme());
  // };