interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full px-4 md:px-8 lg:px-[180px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
